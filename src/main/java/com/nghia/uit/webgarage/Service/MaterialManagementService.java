package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.Material;
import com.nghia.uit.webgarage.Model.MaterialReport;

import java.util.List;

public interface MaterialManagementService {

    List<Material> getAllMatetial();

    List<MaterialReport> getAllMaterialByAllNum();

    List<MaterialReport> getAllNameMatetial();

    ResponseDTO addMateName(String mateName,String currentUser);

    ResponseDTO addMaterial(Material material,String currentUser);

    ResponseDTO updateMaterial(Material material,String id);

    ResponseDTO deleteMaterial(String id);

}
