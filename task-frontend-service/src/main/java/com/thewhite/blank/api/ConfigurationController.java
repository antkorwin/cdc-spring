//Todo поправить в соответствии с названием проекта
package com.thewhite.blank.api;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by Vdovin S. on 07.09.18.
 * Контроллер транслирующий все опции
 *
 * @author Sergey Vdovin
 * @version 1.0
 */
@RestController
@ConfigurationProperties(prefix = "ws")
public class ConfigurationController {
    private Map<String, String> options = new HashMap<>();

    public Map<String, String> getOptions() {
        return options;
    }

    public void setOptions(Map<String, String> options) {
        this.options = options;
    }

    @GetMapping(value = "/app_config/config", produces = "application/javascript")
    public String getApplicationConfig() {
        return options.entrySet().stream()
                      .map(item -> String.format("var %s = \"%s\";", item.getKey(), item.getValue()))
                      .collect(Collectors.joining("\n"));
    }
}
