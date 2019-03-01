package com.brainstation.project.model;

public class CustomResponse {
    private Object content;
    private String message;

    public CustomResponse(){}

    public CustomResponse(Object content){
        this.content = content;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
