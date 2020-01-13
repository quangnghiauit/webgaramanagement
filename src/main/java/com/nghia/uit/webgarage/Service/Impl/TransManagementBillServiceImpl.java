package com.nghia.uit.webgarage.Service.Impl;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Message.Constants;
import com.nghia.uit.webgarage.Model.*;
import com.nghia.uit.webgarage.Repository.DetailRepairBillRepository;
import com.nghia.uit.webgarage.Repository.MaterialReportRepository;
import com.nghia.uit.webgarage.Repository.MaterialRepository;
import com.nghia.uit.webgarage.Repository.RepairBillRepository;
import com.nghia.uit.webgarage.Service.TransManagementBillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class TransManagementBillServiceImpl implements TransManagementBillService {

    public static final Logger logger = LoggerFactory.getLogger(ClientManagementServiceImpl.class);

    @Autowired
    private DetailRepairBillRepository detailRepairBillRepository;

    @Autowired
    private RepairBillRepository repairBillRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private MaterialReportRepository materialReportRepository;

    @Override
    public List<DetailRepairBill> getDetail(String repairBillID) {
        try {
            List<DetailRepairBill> list = detailRepairBillRepository.findAllByRepairBillID(repairBillID);
            if(list.size()==0) {
                return new ArrayList<>();
            } else {
                return list;
            }
        }catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public ResultCarHandleDTO getInfoMaterialUser(String licensePlate) {
        try{

            ResultCarHandleDTO carHandleDTOList = new ResultCarHandleDTO();
            List<CarHandleDTO> handleDTOList = new ArrayList<>();
            if(licensePlate.isEmpty()) {
                return null;
            }

            RepairBill repairBill = repairBillRepository.findByLicensePlate(licensePlate);

            if(repairBill ==null) {
                return null;
            }



            if(repairBill.getRepairBillID().isEmpty()) {
                return null;
            }

            carHandleDTOList.setRepairBillID(repairBill.getRepairBillID());
            carHandleDTOList.setStatus(repairBill.getStatus());
            carHandleDTOList.setLicensePlate(repairBill.getLicensePlate());
            carHandleDTOList.setCreatedDate(repairBill.getCreatedDate());


            List<DetailRepairBill> list = detailRepairBillRepository.findAllByRepairBillID(repairBill.getRepairBillID());

            if(list.size()==0) {
                new ArrayList<>();
            }

            List<Material> materialList = new ArrayList<>();
            for(DetailRepairBill detailRepairBill : list ) {
                CarHandleDTO carHandleDTO = new CarHandleDTO();
                carHandleDTO.setId(detailRepairBill.getId());
                carHandleDTO.setRepairBillID(detailRepairBill.getRepairBillID());
                carHandleDTO.setLicensePlate(licensePlate);
                carHandleDTO.setStatus(repairBill.getStatus());
                carHandleDTO.setReqNum(detailRepairBill.getReqNum());
                carHandleDTO.setInfoBill(detailRepairBill.getInfoBill());
                materialList = materialRepository.findAllByMaterialID(String.valueOf(detailRepairBill.getMaterialID()));
                if(materialList.size()!=0) {
                    carHandleDTO.setMaterialID(materialList.get(0).getMaterialID());
                    carHandleDTO.setMaterialName(materialList.get(0).getMaterialName());
                    carHandleDTO.setPrice(materialList.get(0).getPrice());
                    carHandleDTO.setTotalMoney(carHandleDTO.getPrice()*carHandleDTO.getReqNum());
                }

                handleDTOList.add(carHandleDTO);
            }

            carHandleDTOList.setCarHandleDTOList(handleDTOList);
            return carHandleDTOList;


        }catch (Exception ex) {
            return null;
        }
    }

    @Override
    public DetailRepairBill getDetailMaterial(String repairBillID, String materialID) {
        try {
            if(repairBillID.isEmpty()||materialID.isEmpty()) {
                return null;
            }

            DetailRepairBill detailRepairBill = detailRepairBillRepository.getDetailMaterialByFilter(repairBillID,materialID);

            if(Objects.isNull(detailRepairBill)) {
                return  null;
            }

            return detailRepairBill;

        }catch (Exception ex) {
            return null;
        }
    }


    @Override
    public ResponseDTO addMaterial(DetailRepairBill detailRepairBillAdd, String repairBillID,String currentUser) {
        try {
            DetailRepairBill detailRepairBill1 = new DetailRepairBill();
            detailRepairBill1.setRepairBillID(repairBillID);
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            detailRepairBill1.setCreatedDate(dateFormat.format(date));
            detailRepairBill1.setCreatedBy(currentUser);
            detailRepairBill1.setInfoBill(detailRepairBillAdd.getInfoBill());
            detailRepairBill1.setMaterialID(detailRepairBillAdd.getMaterialID());
            MaterialReport materialReport = materialReportRepository.findByMaterialID(detailRepairBillAdd.getMaterialID());
            if(materialReport.getTotalNum() > detailRepairBillAdd.getReqNum()) {
                detailRepairBill1.setReqNum(detailRepairBillAdd.getReqNum());
                materialReport.setTotalNum(materialReport.getTotalNum()-detailRepairBillAdd.getReqNum());
                materialReportRepository.save(materialReport);
            } else {
                return new ResponseDTO().fail("Số lượng phụ tùng trong kho không đủ để sửa chữa.");
            }
            detailRepairBillRepository.save(detailRepairBill1);
            return new ResponseDTO().success(Constants.DONE_ADDMATERIALSERVICE);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

    @Override
    public ResponseDTO updateMaterial(DetailRepairBill detailRepairBillAdd, String id) {
        try {
            DetailRepairBill detailRepairBill1 = detailRepairBillRepository.findById(id);
            detailRepairBill1.setInfoBill(detailRepairBillAdd.getInfoBill());
            detailRepairBill1.setMaterialID(detailRepairBillAdd.getMaterialID());
            MaterialReport materialReport = materialReportRepository.findByMaterialID(detailRepairBillAdd.getMaterialID());
            if(materialReport.getTotalNum() + detailRepairBill1.getReqNum() > detailRepairBillAdd.getReqNum()) {
                materialReport.setTotalNum(materialReport.getTotalNum()+ detailRepairBill1.getReqNum()-detailRepairBillAdd.getReqNum());
                detailRepairBill1.setReqNum(detailRepairBillAdd.getReqNum());
                materialReportRepository.save(materialReport);
            } else {
                return new ResponseDTO().fail("Số lượng phụ tùng trong kho không đủ để sửa chữa.");
            }
            detailRepairBillRepository.save(detailRepairBill1);
            return new ResponseDTO().success(Constants.DONE_UPDATEMATERIALSERVICE);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

    @Override
    public ResponseDTO deleteMaterial(String id) {
        try {
            DetailRepairBill detailRepairBill1 = detailRepairBillRepository.findById(id);
            detailRepairBillRepository.delete(detailRepairBill1);
            return new ResponseDTO().success(Constants.DONE_DELETEMATERIALSERVICE);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }
}
