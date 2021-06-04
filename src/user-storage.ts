export default class UserStorage {
    static currentUser: number = 0;

    static openRequest: IDBOpenDBRequest;

    static db: IDBDatabase;

    static users: IDBObjectStore;

    static openDB(): IDBOpenDBRequest {
        this.openRequest = indexedDB.open('6677811', 1);

        this.openRequest.onupgradeneeded = (event: any) => {
            this.db = event.target.result;
            this.users = this.db.createObjectStore('users', {
                autoIncrement: true,
            });
        };

        this.openRequest.onsuccess = (event: any) => {
            this.db = event.target.result;
        };

        this.openRequest.onerror = (event: any) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };

        return this.openRequest;
    }

    static addUser(user: any): void {
        const req: IDBOpenDBRequest = this.openDB();

        req.onsuccess = (event: any) => {
            const db: IDBDatabase = event.target.result;
            const transaction: IDBTransaction = db.transaction(
                'users',
                'readwrite',
            );
            const users: IDBObjectStore = transaction.objectStore('users');
            const request: IDBRequest = users.add(user);

            request.onsuccess = () => {
                this.currentUser = request.result as number;
            };
        };

        req.onerror = (event: any) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
    }

    static updateUser(score: string): void {
        const req = this.openDB();

        req.onsuccess = (event: any) => {
            const db: IDBDatabase = event.target.result;
            const transaction: IDBTransaction = db.transaction(
                'users',
                'readwrite',
            );
            const users: IDBObjectStore = transaction.objectStore('users');
            const getUser = users.get(this.currentUser);

            getUser.onsuccess = () => {
                const user = getUser.result;

                if (user.score.length) {
                    const split = user.score.split(':');
                    const seconds = +split[0] * 60 * 60 + +split[1] * 60 + +split[2];
                    const splitNew = score.split(':');
                    const secondsNew = +splitNew[0] * 60 * 60
                        + +splitNew[1] * 60
                        + +splitNew[2];

                    if (secondsNew < seconds) {
                        this.updateUserScore(
                            score,
                            user,
                            users,
                            this.currentUser,
                        );
                    }
                } else {
                    this.updateUserScore(score, user, users, this.currentUser);
                }
            };
        };

        req.onerror = (event: any) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
    }

    static updateUserScore(score: string, user: any, users: IDBObjectStore, currentUser: any): void {
        user.score = score;

        const request = users.put(user, currentUser);

        request.onsuccess = () => {
            currentUser = request.result;
        };
    }
}
