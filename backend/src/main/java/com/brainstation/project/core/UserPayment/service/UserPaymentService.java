package com.brainstation.project.core.UserPayment.service;

import com.brainstation.project.core.UserPayment.dto.UserPaymentDTO;
import com.brainstation.project.model.Card;

import java.util.List;

public interface UserPaymentService {

    List<Card> getUserCards(String userId);

    Card addCard(String userId, Card card);

    boolean deleteCard(String userId, String cardId);
}
