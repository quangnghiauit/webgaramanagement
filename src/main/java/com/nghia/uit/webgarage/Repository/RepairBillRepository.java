package com.nghia.uit.webgarage.Repository;

import com.nghia.uit.webgarage.Model.RepairBill;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairBillRepository extends CrudRepository<RepairBill, Integer> {

    @Query(value = "select * from repairBill as r where r.licensePlate = ?1 and r.status = 1",nativeQuery = true)
    RepairBill findByLicensePlate(String licensePlate);

    @Query(value = "select * from repairBill as r where r.status = 1",nativeQuery = true)
    List<RepairBill> getAllByFilterStatusHandling();

    @Query(value = "select * from repairBill as r where r.repairBillID = ?1",nativeQuery = true)
    RepairBill findByRepairBillID(String repairBillID);

    @Query(value = "select * from repairBill as r where r.status in (1,2)",nativeQuery = true)
    List<RepairBill> getAllByFilter();

    @Query(value = "select * from repairBill as r where r.status in (1,2) and r.userID = ?1",nativeQuery = true)
    List<RepairBill> getAllByUserID(String userID);


    @Query(value = "select * from repairBill as r where r.status = 2 and r.createdDate >= ?1 and r.createdDate <= ?2",nativeQuery = true)
    List<RepairBill> searchRevenueByDate(String startDate, String endDate);

}
