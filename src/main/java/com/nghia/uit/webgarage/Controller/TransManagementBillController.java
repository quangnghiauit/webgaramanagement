package com.nghia.uit.webgarage.Controller;

import com.nghia.uit.webgarage.Model.DetailRepairBill;
import com.nghia.uit.webgarage.Service.TransManagementBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/transmanagementbill")
public class TransManagementBillController {


    @Autowired
    private TransManagementBillService transManagementBillService;

    @GetMapping(value = "/getdetail")
    public @ResponseBody
    ResponseEntity<?> getdetail(@RequestParam String repairBillID) {
        return new ResponseEntity<>(transManagementBillService.getDetail(repairBillID), HttpStatus.OK);
    }

    @GetMapping(value = "/get-info-material-user")
    public @ResponseBody
    ResponseEntity<?> getInfoMaterialUser(@RequestParam String licensePlate){
        return new ResponseEntity<>(transManagementBillService.getInfoMaterialUser(licensePlate),HttpStatus.OK);
    }

    @GetMapping(value = "/get-detail-material")
    public @ResponseBody
    ResponseEntity<?> getDetailMaterial(@RequestParam String repairBillID, @RequestParam String materialID){
        return new ResponseEntity<>(transManagementBillService.getDetailMaterial(repairBillID,materialID),HttpStatus.OK);
    }

    @RequestMapping(value = "/addmaterial", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> addmaterial(@RequestBody DetailRepairBill detailRepairBill, @RequestParam String repairBillID) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(transManagementBillService.addMaterial(detailRepairBill,repairBillID,currentUser), HttpStatus.OK);
    }

    @RequestMapping(value = "/updatematerial", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> updatematerial(@RequestBody DetailRepairBill detailRepairBill, @RequestParam String id) {
        return new ResponseEntity<>(transManagementBillService.updateMaterial(detailRepairBill,id), HttpStatus.OK);
    }

    @RequestMapping(value = "/deletematerial", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletematerial(@RequestParam String id) {
        return new ResponseEntity<>(transManagementBillService.deleteMaterial(id), HttpStatus.OK);
    }


}
