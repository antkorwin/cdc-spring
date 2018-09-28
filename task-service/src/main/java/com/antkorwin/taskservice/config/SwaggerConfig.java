package com.antkorwin.taskservice.config;

import com.google.common.collect.Sets;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;


@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private static final String API_PACKAGE = "com.antkorwin.taskservice.api";

    @Bean
    public Docket docket() {
        Docket docket = new Docket(DocumentationType.SWAGGER_2).select()
                                                               .apis(RequestHandlerSelectors.basePackage(API_PACKAGE))
                                                               .paths(PathSelectors.any())
                                                               .build();

        docket.produces(Sets.newHashSet(APPLICATION_JSON_UTF8_VALUE));
        docket.consumes(Sets.newHashSet(APPLICATION_JSON_UTF8_VALUE));
        docket.useDefaultResponseMessages(false);
        return docket;
    }

}
