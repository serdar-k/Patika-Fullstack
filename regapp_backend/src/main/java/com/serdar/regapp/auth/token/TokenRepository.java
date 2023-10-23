package com.serdar.regapp.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenDto, Integer> {

    @Query("""
                SELECT t FROM TokenDto t INNER JOIN User u ON t.user.id = u.id WHERE u.id = :userId AND (t.expired = FALSE OR t.revoked = FALSE)
            """)
    List<TokenDto> findAllValidTokensByUser(Long userId);

    Optional<TokenDto> findByToken(String token);
}
