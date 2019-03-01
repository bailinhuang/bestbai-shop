package com.brainstation.project.core.UserPayment.controller;

import com.brainstation.project.core.UserPayment.service.UserPaymentServiceImpl;
import com.brainstation.project.model.Card;
import com.brainstation.project.model.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping(value = "/payment")
@RestController
public class UserPaymentController {

    private UserPaymentServiceImpl userPaymentService;

    @Autowired
    public UserPaymentController(UserPaymentServiceImpl userPaymentService) {
        this.userPaymentService = userPaymentService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getUserCards(@RequestParam String userId){
        List<Card> cards = userPaymentService.getUserCards(userId);
        CustomResponse response = new CustomResponse(cards);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addUserCard(@RequestParam String userId, @RequestBody Card card){
        Card returnedCard = userPaymentService.addCard(userId, card);
        CustomResponse response = new CustomResponse(returnedCard);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<CustomResponse> deleteUserCard(@RequestParam String userId, @RequestParam String cardId){
        boolean deletedCard = userPaymentService.deleteCard(userId, cardId);
        CustomResponse response = new CustomResponse(deletedCard);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
