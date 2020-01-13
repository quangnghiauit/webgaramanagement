package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.*;

import java.util.List;

public interface ReportManagementService {

    List<BillDTO> getAllBillHandling();

    BillDTO getDetailBill(String repairBillID);

    List<BillDTO> getAllBill();

    List<BillDTO> getAllBillByUser(String userID);

    ResponseDTO exportBill(DetailBillDTO detailBillDTO,String currentUser);

    List<RepairBill> searchRevenue(RequestSearchDate requestSearchDate);

    List<InventoryReportDTO> searchInventory(RequestSearchDate requestSearchDate);
}
