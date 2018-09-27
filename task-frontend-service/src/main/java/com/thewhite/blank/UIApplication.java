//Todo поправить в соответствии с названием проекта
package com.thewhite.blank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;

/**
 * Created by Vdovin S. on 28.08.18.
 *
 * @author Sergey Vdovin
 * @version 1.0
 */
@EnableEurekaClient
@EnableDiscoveryClient
@SpringBootApplication
public class UIApplication {
    public static void main(String[] args) {

        Logger logger = LoggerFactory.getLogger(UIApplication.class);
        Environment env = SpringApplication.run(UIApplication.class, args).getEnvironment();
        try {
            logger.info("\n----------------------------------------------------------\n\t" +
                        "Application '{}' is running! \n\t" +
                        "Local: \t\thttp://localhost:{}\n\t" +
                        "External: \thttp://{}:{}\n\t" +
                        "----------------------------------------------------------",
                        env.getProperty("spring.application.name"),
                        env.getProperty("server.port"),
                        InetAddress.getLocalHost().getHostAddress(),
                        env.getProperty("server.port"),
                        Arrays.toString(env.getActiveProfiles()));
        } catch (UnknownHostException e) {
            logger.error("Exception host-address", e);
        }
    }
}
