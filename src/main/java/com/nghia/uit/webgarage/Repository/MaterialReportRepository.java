package com.nghia.uit.webgarage.Repository;

import com.nghia.uit.webgarage.Model.MaterialReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialReportRepository extends CrudRepository<MaterialReport,Integer> {


    @Query(value = "select * from materialReport", nativeQuery = true)
    List<MaterialReport> findAllByFilter();

    @Query(value = "select * from materialReport as m where m.materialName =?1",nativeQuery = true)
    MaterialReport findByName(String materialName);

    @Query(value = "select * from materialReport as m where m.materialID =?1",nativeQuery = true)
    MaterialReport findByMaterialID(String materialID);
}
