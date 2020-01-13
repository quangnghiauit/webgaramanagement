package com.nghia.uit.webgarage.Message;

public final class Constants {

    public static final String DEV_USER = "DEV_TEST";
    public static final String CLIENT = "CLIENT";
    public static final String ADMIN = "ADMIN";
    public static final String ACCOUNTANT = "ACCOUNTANT";
    public static final String MECHANIC = "MECHANIC";


    //Client
    public static final String DONE_DELETEREQUESTUSERS = "Xóa user thành công";
    public static final String DONE_ADDREQUESTUSERS = "Thêm user thành công";
    public static final String DONE_UPDATEREQUESTUSERS = "Cập nhật user thành công";
    public static final String FAIL_EXISTSUSERS = "UserName đã tồn tại";

    //
    //Car
    public static final String DONE_DELETEREQUESTCAR = "Xóa xe thành công";
    public static final String DONE_ADDREQUESTCAR = "Thêm xe thành công";
    public static final String DONE_UPDATEREQUESTCAR = "Cập nhật xe thành công";

    //Material
    public static final String DONE_DELETEREQUESTMATERIAL = "Xóa vật tư thành công";
    public static final String DONE_ADDREQUESTMATERIAL = "Thêm vật tư thành công";
    public static final String DONE_UPDATEREQUESTMATERIAL = "Cập nhật vật tư thành công";

    //Process car
    public static final int INIT_PROCESS = 0;
    public static final int PROCESSING = 1;
    public static final int DONE_PROCESS = 2;
    public static final String PROCESSING_MESSAGE = "Tiếp nhận xử lý thành công";
    public static final String DONE_PROCESSMESSAGE = "Đã hoàn thành sửa chữa";

    //Process car service
    public static final String DONE_ADDMATERIALSERVICE = "Thêm phụ tùng thành công";
    public static final String DONE_UPDATEMATERIALSERVICE = "Cập nhật phụ tùng thành công";
    public static final String DONE_DELETEMATERIALSERVICE = "Xóa phụ tùng thành công";

    //Bill
    public static final int BILL_NO_HANDLE = 0;
    public static final int BILL_PROCESSING = 1;


}
