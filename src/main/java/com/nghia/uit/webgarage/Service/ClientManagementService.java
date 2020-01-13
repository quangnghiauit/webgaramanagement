package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.ClientDTO;
import com.nghia.uit.webgarage.Model.Users;

import java.util.List;

public interface ClientManagementService {
    List<ClientDTO> getAllClient();

    Users getInfoUser(String userID);

    ResponseDTO addClient(ClientDTO users,String userName);

    ResponseDTO updateClient(ClientDTO clientDTO, String userID,String userName);

    ResponseDTO deleteClient(String userID);
}
