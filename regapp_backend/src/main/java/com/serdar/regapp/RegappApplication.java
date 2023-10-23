package com.serdar.regapp;

import com.serdar.regapp.user.UserService;
import com.serdar.regapp.user.dto.request.CreateUserRequest;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.serdar.regapp.user.UserRepository;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RegappApplication {

    public static void main(String[] args) {
        SpringApplication.run(RegappApplication.class, args);
    }

    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    @Bean
    CommandLineRunner userCreator(UserRepository userRepository, PasswordEncoder passwordEncoder, UserService userService) {
//		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return new CommandLineRunner() {

            @Override
            public void run(String... args) throws Exception {

//                var user = CreateUserRequest.builder().username("serdar").email("serdar@mail").password("serdar").role(USER).build();
//                System.out.println(userService.save(user).getToken());
//
//                var admin = CreateUserRequest.builder().username("admin").email("admin@mail").password("admin").role(ADMIN).build();
//                System.out.println(userService.save(admin).getToken());

            }

        };
    }
}
