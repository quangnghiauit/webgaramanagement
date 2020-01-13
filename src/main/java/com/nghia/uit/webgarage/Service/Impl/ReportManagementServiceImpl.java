package com.nghia.uit.webgarage.Service.Impl;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.*;
import com.nghia.uit.webgarage.Repository.*;
import com.nghia.uit.webgarage.Service.ReportManagementService;
import com.nghia.uit.webgarage.Service.ServiceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class ReportManagementServiceImpl implements ReportManagementService {

    @Autowired
    private RepairBillRepository repairBillRepository;

    @Autowired
    private DetailRepairBillRepository detailRepairBillRepository;

    @Autowired
    private MaterialReportRepository materialReportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public List<BillDTO> getAllBillHandling() {
        try {
            List<RepairBill> repairBills = repairBillRepository.getAllByFilterStatusHandling();

            if(repairBills.isEmpty()) {
                return new ArrayList<>();
            }


            List<BillDTO> billDTOS = new ArrayList<>();
            for(RepairBill repairBill : repairBills) {
                BillDTO billDTO = new BillDTO();
                List<DetailBillDTO> detailBillDTOS = new ArrayList<>();

                if(!repairBill.getRepairBillID().isEmpty()) {
                    List<DetailRepairBill> detailRepairBills = detailRepairBillRepository.findAllByRepairBillID(repairBill.getRepairBillID());

                    if(!detailRepairBills.isEmpty()) {

                        for(DetailRepairBill detailRepairBill :detailRepairBills) {
                            DetailBillDTO detailBillDTO = new DetailBillDTO();
                            String strMaterialName = null;
                            MaterialReport material = new MaterialReport();
                            if(!detailRepairBill.getMaterialID().isEmpty()) {
                                MaterialReport materialReport = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                                material = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                                if(!materialReport.getMaterialName().isEmpty()){
                                    strMaterialName = materialReport.getMaterialName();
                                }
                            }
                            detailBillDTO.doMappingDetailReport(detailRepairBill,strMaterialName,material);
                            detailBillDTOS.add(detailBillDTO);
                        }


                    }
                }
                Users users = userRepository.findByUserID(String.valueOf(repairBill.getUserID()));
                String strFullName = null;
                if(!Objects.isNull(users)) {
                    strFullName = users.getDisplayname();
                }
                billDTO.doMappingBill(repairBill,strFullName,detailBillDTOS);
                billDTOS.add(billDTO);
            }

            return billDTOS;


        }catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public BillDTO getDetailBill(String repairBillID) {
        try {
            if(repairBillID.isEmpty()) {
                return null;
            }
            RepairBill repairBill = repairBillRepository.findByRepairBillID(repairBillID);

            if(Objects.isNull(repairBill)) {
                return null;
            }
            BillDTO billDTO = new BillDTO();
            List<DetailBillDTO> detailBillDTOS = new ArrayList<>();

            if(!repairBill.getRepairBillID().isEmpty()) {
                List<DetailRepairBill> detailRepairBills = detailRepairBillRepository.findAllByRepairBillID(repairBill.getRepairBillID());

                if(!detailRepairBills.isEmpty()) {


                    for(DetailRepairBill detailRepairBill :detailRepairBills) {
                        DetailBillDTO detailBillDTO = new DetailBillDTO();
                        String strMaterialName = null;
                        MaterialReport material = new MaterialReport();
                        if(!detailRepairBill.getMaterialID().isEmpty()) {
                            MaterialReport materialReport = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                            material = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                            if(!materialReport.getMaterialName().isEmpty()){
                                strMaterialName = materialReport.getMaterialName();
                            }
                        }
                        detailBillDTO.doMappingDetailReport(detailRepairBill,strMaterialName,material);
                        detailBillDTOS.add(detailBillDTO);
                    }


                }
            }
            Users users = userRepository.findByUserID(String.valueOf(repairBill.getUserID()));
            String strFullName = null;
            if(!Objects.isNull(users)) {
                strFullName = users.getDisplayname();
            }
            billDTO.doMappingBill(repairBill,strFullName,detailBillDTOS);
            return  billDTO;
        }catch (Exception ex) {
            return null;
        }
    }

    @Override
    public List<BillDTO> getAllBill() {
        try {
            List<RepairBill> repairBills = repairBillRepository.getAllByFilter();

            if(repairBills.isEmpty()) {
                return new ArrayList<>();
            }


            List<BillDTO> billDTOS = new ArrayList<>();
            for(RepairBill repairBill : repairBills) {
                BillDTO billDTO = new BillDTO();
                List<DetailBillDTO> detailBillDTOS = new ArrayList<>();

                if(!repairBill.getRepairBillID().isEmpty()) {
                    List<DetailRepairBill> detailRepairBills = detailRepairBillRepository.findAllByRepairBillID(repairBill.getRepairBillID());

                    if(!detailRepairBills.isEmpty()) {


                        for(DetailRepairBill detailRepairBill :detailRepairBills) {
                            DetailBillDTO detailBillDTO = new DetailBillDTO();
                            String strMaterialName = null;
                            MaterialReport material = new MaterialReport();
                            if(!detailRepairBill.getMaterialID().isEmpty()) {
                                MaterialReport materialReport = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                                material = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                                if(!materialReport.getMaterialName().isEmpty()){
                                    strMaterialName = materialReport.getMaterialName();
                                }
                            }
                            detailBillDTO.doMappingDetailReport(detailRepairBill,strMaterialName,material);
                            detailBillDTOS.add(detailBillDTO);
                        }


                    }
                }
                Users users = userRepository.findByUserID(String.valueOf(repairBill.getUserID()));
                String strFullName = null;
                if(!Objects.isNull(users)) {
                    strFullName = users.getDisplayname();
                }
                billDTO.doMappingBill(repairBill,strFullName,detailBillDTOS);
                billDTOS.add(billDTO);
            }

            return billDTOS;


        }catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<BillDTO> getAllBillByUser(String userID) {
        try {
            if(userID.isEmpty()||Objects.isNull(userID)) {
                return new ArrayList<>();
            }

            List<RepairBill> repairBills = repairBillRepository.getAllByUserID(userID);

            if(repairBills.isEmpty()) {
                return new ArrayList<>();
            }


            List<BillDTO> billDTOS = new ArrayList<>();
            for(RepairBill repairBill : repairBills) {
                BillDTO billDTO = new BillDTO();
                List<DetailBillDTO> detailBillDTOS = new ArrayList<>();

                if(!repairBill.getRepairBillID().isEmpty()) {
                    List<DetailRepairBill> detailRepairBills = detailRepairBillRepository.findAllByRepairBillID(repairBill.getRepairBillID());

                    if(!detailRepairBills.isEmpty()) {


                        for(DetailRepairBill detailRepairBill :detailRepairBills) {
                            DetailBillDTO detailBillDTO = new DetailBillDTO();
                            String strMaterialName = null;
                            MaterialReport material = new MaterialReport();
                            if(!detailRepairBill.getMaterialID().isEmpty()) {
                                MaterialReport materialReport = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                                material = materialReportRepository.findByMaterialID(detailRepairBill.getMaterialID());
                                if(!materialReport.getMaterialName().isEmpty()){
                                    strMaterialName = materialReport.getMaterialName();
                                }
                            }
                            detailBillDTO.doMappingDetailReport(detailRepairBill,strMaterialName,material);
                            detailBillDTOS.add(detailBillDTO);
                        }


                    }
                }
                Users users = userRepository.findByUserID(String.valueOf(repairBill.getUserID()));
                String strFullName = null;
                if(!Objects.isNull(users)) {
                    strFullName = users.getDisplayname();
                }
                billDTO.doMappingBill(repairBill,strFullName,detailBillDTOS);
                billDTOS.add(billDTO);
            }

            return billDTOS;


        }catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public ResponseDTO exportBill(DetailBillDTO detailBillDTO,String currentUser) {
        try {
            long totalMoney = detailBillDTO.getTotalMoney();
            String repairBillID = detailBillDTO.getRepairBillID();

            RepairBill repairBill = repairBillRepository.findByRepairBillID(repairBillID);

            if(Objects.isNull(repairBill)) {
                return new ResponseDTO().fail("Xuất hóa đơn không thành công");
            }
            repairBill.setStatus(2);
            repairBill.setExportBy(currentUser);

            if(totalMoney >= 0) {
                repairBill.setTotalMoney(totalMoney);
            }

            repairBill.setExportDate(convertDate());

            Car car = carRepository.findCarByLicensePlate(repairBill.getLicensePlate());
            if(Objects.isNull(car))  {
                return new ResponseDTO().fail("Xuất hóa đơn không thành công");
            }

            car.setStatus(2);
            carRepository.save(car);


            repairBillRepository.save(repairBill);
            return new ResponseDTO().success("Xuất hóa đơn thành công");
        }catch (Exception ex) {
            return new ResponseDTO().fail("Xuất hóa đơn không thành công");
        }
    }

    @Override
    public List<RepairBill> searchRevenue(RequestSearchDate requestSearchDate) {
        try {
            String startDate = requestSearchDate.getStartDate();
            String endDate = requestSearchDate.getEndDate();

            if(startDate ==null || endDate == null ) {
                return new ArrayList<>();
            }
            List<RepairBill> repairBills = repairBillRepository.searchRevenueByDate(convertDateString(startDate),convertDateString(endDate));

            if(repairBills.isEmpty()) {
                return new ArrayList<>();
            }
            return repairBills;

        } catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<InventoryReportDTO> searchInventory(RequestSearchDate requestSearchDate) {
        try{
            String startDate = requestSearchDate.getStartDate();
            String endDate = requestSearchDate.getEndDate();

            if(startDate ==null || endDate == null ) {
                return new ArrayList<>();
            }

            List<InventoryReportDTO> inventoryReportDTOS = new ArrayList<>();

            List<Material> materialList = materialRepository.searchMaterialInputByDate(convertDateString(startDate),convertDateString(endDate));
            List<DetailRepairBill> detailRepairBills = detailRepairBillRepository.searchMaterialExportByDate(convertDateString(startDate),convertDateString(endDate));
            if(materialList.isEmpty()||detailRepairBills.isEmpty()) {
                return new ArrayList<>();
            }

            List<String> listMaterialID = new ArrayList<>();

            for(Material material : materialList) {
                if(!listMaterialID.contains(material.getMaterialID())) {
                    listMaterialID.add(material.getMaterialID());

                    InventoryReportDTO inventoryReportDTO = new InventoryReportDTO();
                    inventoryReportDTO.setMaterialID(material.getMaterialID());
                    inventoryReportDTO.setMaterialName(material.getMaterialName());
                    inventoryReportDTOS.add(inventoryReportDTO);
                }
            }

            if(!listMaterialID.isEmpty() && !inventoryReportDTOS.isEmpty()) {
                for(InventoryReportDTO inventoryReportDTO : inventoryReportDTOS) {
                    for(Material material :materialList) {
                        if(material.getMaterialID().equals(inventoryReportDTO.getMaterialID())) {
                            long totalInput = inventoryReportDTO.getTotalInput();
                            long totalMaterialInput = inventoryReportDTO.getTotalMaterialInput();

                            inventoryReportDTO.setTotalInput(totalInput + 1);
                            inventoryReportDTO.setTotalMaterialInput(totalMaterialInput + material.getNumInput());
                            inventoryReportDTO.setLastInventory(inventoryReportDTO.getTotalMaterialInput() - inventoryReportDTO.getTotalMaterialExport());

                        }
                    }

                    for(DetailRepairBill detailRepairBill : detailRepairBills) {
                        if(detailRepairBill.getMaterialID().equals(inventoryReportDTO.getMaterialID())) {
                            long totalMaterialExport = inventoryReportDTO.getTotalMaterialExport();
                            inventoryReportDTO.setTotalMaterialExport(totalMaterialExport + detailRepairBill.getReqNum());
                            inventoryReportDTO.setLastInventory(inventoryReportDTO.getTotalMaterialInput() - inventoryReportDTO.getTotalMaterialExport());
                        }
                    }
                }
            }

            return inventoryReportDTOS;

        }catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    private String convertDate() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        return dateFormat.format(date); //2019/03/13 20:08:43
    }

    private String convertDateString(String date) {
        String[] strArr1 = date.split("/");
        StringBuilder stringBuilder1 = new StringBuilder();
        stringBuilder1.append(strArr1[2]).append("-").append(strArr1[1]).append("-").append(strArr1[0]);
        String dateStr= String.valueOf(stringBuilder1);
        return dateStr;
    }
}
