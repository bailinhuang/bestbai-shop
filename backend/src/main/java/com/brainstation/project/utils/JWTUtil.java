package com.brainstation.project.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;

public class JWTUtil {

    Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String createJWT(String id){
        Long now = System.currentTimeMillis();
        LocalDateTime expiration = LocalDateTime.now();
        expiration.plusMinutes(5);
        Date date = new Date();
        return Jwts.builder().setSubject(id).signWith(key).setExpiration(new Date(now + 50 * 1000)).compact();
    }

    public boolean validateExpirationJWT(String jwt){
        try{
            Jwts.parser().setSigningKey(key).parseClaimsJws(jwt);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
