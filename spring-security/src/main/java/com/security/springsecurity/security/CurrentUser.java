package com.security.springsecurity.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.*;

/*
    This is a meta annotation so we don't get too tied to Spring Security annotations.
    Reduces dependency on Spring Security from our project.

    CurrentUser annotation is a wrapper around @AuthenticationPrincipal annotation.
*/
@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal
public @interface CurrentUser {
}
