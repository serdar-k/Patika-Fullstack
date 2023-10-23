package com.serdar.regapp.user;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.lang.Collections;
import jakarta.validation.constraints.AssertFalse.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {

    USER(Set.of(Permission.USER_CREATE, Permission.USER_READ, Permission.USER_UPDATE, Permission.USER_DELETE)),

    ADMIN(Set.of(Permission.ADMIN_CREATE, Permission.ADMIN_READ, Permission.ADMIN_UPDATE, Permission.ADMIN_DELETE));

    @Getter
    private final Set<Permission> permissions;

    public java.util.List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions().stream().map(permission -> new SimpleGrantedAuthority(permission.name()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }

}
