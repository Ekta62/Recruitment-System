export class UserModel {

    firstName : string;
    lastName:string;
    role:string;
    nicNumber :string;
    contactNumber:number;
    emergencyNumber:number;
    address:string;
    age:number;
    gender:string;
    studentId:string;
    systemId:string;
    joinDate:string;
    dateofBirth:string;
    note:string;
    injury:boolean;
    staffType:string;
    drivingInfo  :drivingInfo[];
    reason:string;

}


export class drivingInfo {
    drivingLicen:string;
    vehicleNumber:string;
    vehicleType :string;
}
