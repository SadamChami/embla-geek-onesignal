
export class LocalStorage{
    public static getData(propertyName: string ): string{
        return localStorage.getItem(propertyName);
    }

    public static saveData(propertyName: string, value: string ){
        localStorage.setItem(propertyName, value);
    }
}