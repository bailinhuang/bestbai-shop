package com.brainstation.project.core.UserPayment.service;

import com.brainstation.project.core.UserPayment.dao.UserPaymentDAO;
import com.brainstation.project.core.UserPayment.dto.UserPaymentDTO;
import com.brainstation.project.model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPaymentServiceImpl implements UserPaymentService {

    private UserPaymentDAO userPaymentDAO;

    @Autowired
    public UserPaymentServiceImpl(UserPaymentDAO userPaymentDAO) {
        this.userPaymentDAO = userPaymentDAO;
    }

    public List<Card> getUserCards(String userId){
        return userPaymentDAO.findByUserId(userId).getCards();
    }

    public Card addCard(String userId, Card card){
        UserPaymentDTO userPaymentDTO = userPaymentDAO.findByUserId(userId);
        userPaymentDTO.getCards().add(card);
        userPaymentDAO.save(userPaymentDTO);
        return card;
    }

    public boolean deleteCard(String userId, String cardId){
        UserPaymentDTO userPaymentDTO = userPaymentDAO.findByUserId(userId);
        Card card = userPaymentDTO.getCards().stream().filter(c -> c.getId().equals(cardId)).findFirst().orElse(null);
        if(card == null){
            return false;
        } else{
            userPaymentDTO.getCards().remove(card);
            userPaymentDAO.save(userPaymentDTO);
            return true;
        }
    }

    public void addUserPayment(String userId){
        UserPaymentDTO userPaymentDTO = new UserPaymentDTO();
        userPaymentDTO.setUserId(userId);
        userPaymentDAO.save(userPaymentDTO);
    }
}
