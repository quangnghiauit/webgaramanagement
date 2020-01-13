package com.nghia.uit.webgarage.Service;

public class ServiceUtils {
    public static String convertData(String strDate) {
        String[] strArr = strDate.split("\\s+");
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(strArr[0]).append(strArr[1]);
        String string1 = String.valueOf(stringBuilder);
        String[] strArr1 = string1.split("-");
        StringBuilder stringBuilder1 = new StringBuilder();
        stringBuilder1.append(strArr1[0]).append(strArr1[1]).append(strArr1[2]);
        String string2 = String.valueOf(stringBuilder1);
        String[] strArr2 = string2.split(":");
        StringBuilder stringBuilder2 = new StringBuilder();
        stringBuilder2.append(strArr2[0]).append(strArr2[1]).append(strArr2[2]);
        String dateStr= String.valueOf(stringBuilder2);
        return dateStr;
    }
}
