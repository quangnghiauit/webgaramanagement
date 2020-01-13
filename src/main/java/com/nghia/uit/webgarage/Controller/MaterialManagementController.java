package com.nghia.uit.webgarage.Controller;

import com.nghia.uit.webgarage.Model.ClientDTO;
import com.nghia.uit.webgarage.Model.Material;
import com.nghia.uit.webgarage.Service.MaterialManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/material-management")
public class MaterialManagementController {

    @Autowired
    private MaterialManagementService materialManagementService;

    @GetMapping(value = "/get-all-material")
    public @ResponseBody
    ResponseEntity<?> getAllMaterial() {
        return new ResponseEntity<>(materialManagementService.getAllMatetial(), HttpStatus.OK);
    }

    @GetMapping(value = "/get-all-material-by-all-num")
    public ResponseEntity<?> getAllMaterilaByAllNum() {
        return new ResponseEntity<>(materialManagementService.getAllMaterialByAllNum(),HttpStatus.OK);
    }

    @GetMapping(value = "/get-all-name-material")
    public @ResponseBody
    ResponseEntity<?> getAllNameMaterial() {
        return new ResponseEntity<>(materialManagementService.getAllNameMatetial(), HttpStatus.OK);
    }

    @RequestMapping(value = "/add-name-material",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> addNameMaterial(@RequestParam String mateName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(materialManagementService.addMateName(mateName,currentUser),HttpStatus.OK);
    }

    @RequestMapping(value = "/add-material",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> addMaterial(@RequestBody Material material) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(materialManagementService.addMaterial(material,currentUser),HttpStatus.OK);
    }

    @RequestMapping(value = "/update-material",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> updateMaterial(@RequestBody Material material, @RequestParam String id) {
        return new ResponseEntity<>(materialManagementService.updateMaterial(material,id),HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-material", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteMaterial(@RequestParam String id) {
        return new ResponseEntity<>(materialManagementService.deleteMaterial(id), HttpStatus.OK);
    }
}
