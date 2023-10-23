package com.serdar.regapp.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.serdar.regapp.user.Role;
import com.serdar.regapp.user.User;

import jakarta.validation.constraints.AssertFalse.List;

import java.util.Collection;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtUserDetails implements UserDetails {

    private Long id;
    private String username;
    private String email;
    private String password;
    private Role role;
    
    public JwtUserDetails(User user) {
    	this.id = user.getId();
    	this.username = user.getUsername();
    	this.email = user.getEmail();
    	this.password = user.getPassword();
    	this.role = user.getRole();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	System.out.println("ROLLER: " + role.getAuthorities());
        return role.getAuthorities();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
