package com.serdar.regapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.serdar.regapp.user.Permission;
import com.serdar.regapp.user.Role;

import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> {
			try {
				csrf
				        .disable()
				        .authorizeHttpRequests()
				        .requestMatchers(AntPathRequestMatcher.antMatcher("/api/v1/auth/**"), AntPathRequestMatcher.antMatcher("/api/v1/users/signup"), AntPathRequestMatcher.antMatcher("/api/v1/image/**"), AntPathRequestMatcher.antMatcher("/api/v1/vehicles/**"))
				        .permitAll()

						.requestMatchers(AntPathRequestMatcher.antMatcher("/api/v1/users/**")).hasAnyRole(Role.USER.name(), Role.ADMIN.name())
						.requestMatchers(HttpMethod.POST, "/api/v1/users/**").hasAnyAuthority(Permission.USER_CREATE.name(), Permission.ADMIN_CREATE.name())
						.requestMatchers(HttpMethod.GET, "/api/v1/users/**").hasAnyAuthority(Permission.USER_READ.name(), Permission.ADMIN_READ.name())
						.requestMatchers(HttpMethod.PUT, "/api/v1/users/**").hasAnyAuthority(Permission.USER_UPDATE.name(), Permission.ADMIN_UPDATE.name())
						.requestMatchers(HttpMethod.DELETE, "/api/v1/users/**").hasAnyAuthority(Permission.USER_DELETE.name(), Permission.ADMIN_DELETE.name())

						.requestMatchers(AntPathRequestMatcher.antMatcher("/api/v1/admin/**")).hasRole(Role.ADMIN.name())
				        .requestMatchers(HttpMethod.POST, "/api/v1/admin/**").hasAuthority(Permission.ADMIN_CREATE.name())
				        .requestMatchers(HttpMethod.GET, "/api/v1/admin/**").hasAuthority(Permission.ADMIN_READ.name())
				        .requestMatchers(HttpMethod.PUT, "/api/v1/admin/**").hasAuthority(Permission.ADMIN_UPDATE.name())
				        .requestMatchers(HttpMethod.DELETE, "/api/v1/admin/**").hasAuthority(Permission.ADMIN_DELETE.name())

//						.requestMatchers(AntPathRequestMatcher.antMatcher("/api/v1/auth/refresh-token")).hasAnyRole(Role.USER.name(), Role.ADMIN.name())
//						.requestMatchers(HttpMethod.POST, "/api/v1/auth/refresh-token").hasAnyAuthority(Permission.USER_CREATE.name(), Permission.ADMIN_CREATE.name())
//						.requestMatchers(HttpMethod.GET, "/api/v1/auth/refresh-token").hasAnyAuthority(Permission.USER_READ.name(), Permission.ADMIN_READ.name())
//						.requestMatchers(HttpMethod.PUT, "/api/v1/auth/refresh-token").hasAnyAuthority(Permission.USER_UPDATE.name(), Permission.ADMIN_UPDATE.name())
//						.requestMatchers(HttpMethod.DELETE, "/api/v1/auth/refresh-token").hasAnyAuthority(Permission.USER_DELETE.name(), Permission.ADMIN_DELETE.name())

				        .anyRequest()
				        .authenticated();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		})
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterAfter(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout.logoutUrl("/api/v1/auth/logout")).logout(logout -> logout.addLogoutHandler(logoutHandler)).logout(logout -> logout.logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()));

        return http.build();
    }
}
