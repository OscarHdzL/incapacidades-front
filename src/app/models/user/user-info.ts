export class UserInfo {

    public constructor(init?: Partial<UserInfo>) {
        Object.assign(this, init);
    }

    businessCategory?: number;
    cn?: string;
    departmentNumber?: number;
    displayName?: string;
    employeeNumber?: string;
    employeeType?: string;
    givenName?: string;
    imssareas?: string;
    imssmatricula?: string;
    imssperfiles?: string;
    imsssistemas?: string;
    initials?: string;
    mail?: string;
    sn?: string;
    sub?: string;
    title?: string;
    uid?: string;
    
}