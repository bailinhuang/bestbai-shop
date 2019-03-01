package com.brainstation.project.core.UserPayment.dto;

import com.brainstation.project.model.Card;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(value = "userpayment")
public class UserPaymentDTO {

    @Id
    private String id;

    private String userId;
    private List<Card> cards;

    public UserPaymentDTO() {
        cards = new ArrayList<>();
    }

    public UserPaymentDTO(String id, String userId, List<Card> cards) {
        this.id = id;
        this.userId = userId;
        this.cards = cards;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
