package com.nghia.uit.webgarage.Controller;

import com.nghia.uit.webgarage.Model.DetailBillDTO;
import com.nghia.uit.webgarage.Model.RequestSearchDate;
import com.nghia.uit.webgarage.Service.ReportManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/report-management")
public class ReportManagementController {

    @Autowired
    private ReportManagementService reportManagementService;

    @GetMapping(value = "/get-all-bill-handling")
    public ResponseEntity<?> getAllBillHandling() {
        return new ResponseEntity<>(reportManagementService.getAllBillHandling(), HttpStatus.OK);
    }

    @GetMapping(value = "/get-detail-bill")
    public ResponseEntity<?> getAllBill(@RequestParam String repairBillID) {
        return new ResponseEntity<>(reportManagementService.getDetailBill(repairBillID), HttpStatus.OK);
    }

    @GetMapping(value = "/get-all-bill")
    public ResponseEntity<?> getAllBill() {
        return new ResponseEntity<>(reportManagementService.getAllBill(), HttpStatus.OK);
    }

    @GetMapping(value = "/get-all-bill-by-user")
    public ResponseEntity<?> getAllBillByUser(@RequestParam String userID) {
        return new ResponseEntity<>(reportManagementService.getAllBillByUser(userID), HttpStatus.OK);
    }

    @RequestMapping(value = "/export-bill",method = RequestMethod.POST)
    public ResponseEntity<?> exportBill(@RequestBody DetailBillDTO detailBillDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(reportManagementService.exportBill(detailBillDTO,currentUser),HttpStatus.OK);
    }

    @RequestMapping(value = "/search-revenue",method = RequestMethod.POST)
    public ResponseEntity<?> searchRevenue(@RequestBody RequestSearchDate requestSearchDate) {
        return new ResponseEntity<>(reportManagementService.searchRevenue(requestSearchDate),HttpStatus.OK);
    }

    @RequestMapping(value = "/search-inventory",method = RequestMethod.POST)
    public ResponseEntity<?> searchInventory(@RequestBody RequestSearchDate requestSearchDate) {
        return new ResponseEntity<>(reportManagementService.searchInventory(requestSearchDate),HttpStatus.OK);
    }

}
