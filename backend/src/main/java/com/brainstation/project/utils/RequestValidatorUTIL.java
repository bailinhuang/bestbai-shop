package com.brainstation.project.utils;

public class RequestValidatorUTIL {

    public static boolean validateUndefined(String ...args){
        for(String arg : args){
            if(arg == null){
                return true;
            }
            else if(arg.equals("undefined")){
                return true;
            }
        }
        return false;
    }
}
