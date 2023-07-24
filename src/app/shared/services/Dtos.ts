  export interface UserResponse{
    DisplayName : string;
    UserName : string;
    SessionId : string;
    ReferrerUrl : string;
    ResponseStatus : object;
  }
  
  export interface IUserInfo{
    MobileUserId: number;
    PayAcc: string;
    PayOperId: string;
  }
  
  export interface IUserInfoResponse{
    Result: IUserInfo[];
  }

  export interface DisDocByExpeditor{
    VisitId: number;
    VisitStatus: number;
    Acc : string;
    Accnu : string;
    Address : string;
    Ordsuccess : number;
    Ordn : number;
    Retsuccess : number;
    Retn : number;
    Collectpay : number;
    Payedcash : number;
  }
  
  export interface DisDocByExpeditorResponse{
    Result: DisDocByExpeditor[];
  }

  export interface IFinishExpeditorVisitResponse{
    Result: boolean;
  }

  export interface IOrder{
    DwaybillNumber: string;
    Preseller: string;
    Remark: string;
    Status: boolean;
    Comment: string;
  }
  
  export interface ISavedRowOrder{
    Index: number;
    Id: string;
  }
  
  export interface VisitDetails{
    Book_ID:	string;	
    Docs_ID: string;	
    Waybillnum:	string;	
    PresalerNu: string;	
    Note: string;	
    Ostatus:	string | null;	
    Comment: string;
  }

  export interface IWaybillDetails{
    OrderId:string;
    Bcode:string;
    Products_nu:string;
    Scount:number;
    Waybillnum:string;
  }
  
  export interface Resp{
    Result: IWaybillDetails[];
  }

  export interface IDebtInfo{
    PresellerId: number;
    PresellerName: string;
    DisplayString: string;
    MobileUserId: number;
    Debt: number;
    OverdueDebt: number;
  }
  
  export interface IDebtInfoResponse{
    Result: IDebtInfo[];
  }
  
  export interface IConfirmPaymentResponse{
    Result: string;
  }
  
  export interface ITransaction{
    BookId: string;
    DocsId: string;
    OpDetId: string;
    DDate: Date;
    DateString: string;
    Acc: string;
    AccName: string;
    Vg: number;
    IsCr: boolean;
    StartVg: number;
    EndVg: number;
  }
  
  export interface ITransactionResponse{
    Result: ITransaction[];
  }