package com.nghia.uit.webgarage.Bean;

import java.util.List;

public class ResponseDTO<T> {

    protected static final String OK_CODE= "1";
    protected static final String NOK_CODE= "0";

    protected String returnCode;
    protected String returnMessage;

    public ResponseDTO(String returnCode, String returnMessage) {
        this.returnCode= returnCode;
        this.returnMessage = returnMessage;
    }

    public ResponseDTO() {

    }

    public ResponseDTO fail(String message) {
        this.returnCode=NOK_CODE;
        this.returnMessage=message;
        return this;
    }

    public ResponseDTO success(String message) {
        this.returnCode=OK_CODE;
        this.returnMessage=message;
        return this;
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMessage() {
        return returnMessage;
    }

    public void setReturnMessage(String returnMessage) {
        this.returnMessage = returnMessage;
    }
}
