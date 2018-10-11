package com.antkorwin.reportservice.service;

import java.util.List;

import com.antkorwin.reportservice.model.Task;
import com.antkorwin.reportservice.model.Value;

/**
 * Created on 24.09.2018.
 *
 * TODO: replace on javadoc
 *
 * @author Korovin Anatoliy
 */
public interface MetricsService {

    List<Value> evaluate(List<Task> tasks);
}
