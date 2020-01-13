package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.DetailRepairBill;
import com.nghia.uit.webgarage.Model.ResultCarHandleDTO;

import java.util.List;

public interface TransManagementBillService {

    List<DetailRepairBill> getDetail(String repairBillID);

    ResultCarHandleDTO getInfoMaterialUser(String licensePlate);

    DetailRepairBill getDetailMaterial(String repairBillID,String materialID);

    ResponseDTO addMaterial(DetailRepairBill detailRepairBill, String repairBillID,String currentUser);

    ResponseDTO updateMaterial(DetailRepairBill detailRepairBill, String id);

    ResponseDTO deleteMaterial(String id);
}
