package com.nghia.uit.webgarage.Repository;

import com.nghia.uit.webgarage.Model.DetailRepairBill;
import com.nghia.uit.webgarage.Model.Material;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailRepairBillRepository extends CrudRepository<DetailRepairBill, Integer> {

    @Query(value = "select * from detailRepairBill as d where d.id =?1",nativeQuery = true)
    DetailRepairBill findById(String id);

    @Query(value = "select * from detailRepairBill as d where d.repairBillID =?1",nativeQuery = true)
    List<DetailRepairBill> findAllByRepairBillID(String repairBillID);

    @Query(value = "select * from detailRepairBill as d where d.createdDate >= ?1 and d.createdDate <= ?2",nativeQuery = true)
    List<DetailRepairBill> searchMaterialExportByDate(String startDate, String endDate);

    @Query(value = "select * from detailRepairBill as d where d.repairBillID =?1 and d.materialID = ?2",nativeQuery = true)
    DetailRepairBill getDetailMaterialByFilter(String repairBillID,String materialID);
}
