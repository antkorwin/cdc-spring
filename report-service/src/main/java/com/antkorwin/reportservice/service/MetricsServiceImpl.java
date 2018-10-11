package com.antkorwin.reportservice.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.antkorwin.reportservice.model.Task;
import com.antkorwin.reportservice.model.Value;

import org.springframework.stereotype.Service;

/**
 * Created on 24.09.2018.
 *
 * TODO: replace on javadoc
 *
 * @author Korovin Anatoliy
 */
@Service
public class MetricsServiceImpl implements MetricsService {

    @Override
    public List<Value> evaluate(List<Task> tasks) {

        return Arrays.asList(evaluateMetricsInRange(tasks, 0, 10, "easy"),
                             evaluateMetricsInRange(tasks, 11, 20, "cool"),
                             evaluateMetricsInRange(tasks, 21, 40, "hard"),
                             evaluateMetricsInRange(tasks, 41, 1000, "unicorn"));
    }

    private Value evaluateMetricsInRange(List<Task> tasks, int from, int to, String prefix) {

        List<Task> filtered = filterByRange(tasks, from, to);
        Double percent = (double) (filtered.size() * 100) / (double) tasks.size();
        return new Value(String.format("%d..%d - %s", from, to, prefix), percent);
    }

    private List<Task> filterByRange(List<Task> tasks, int from, int to) {

        return tasks.stream()
                    .filter(t -> t.getEstimate() >= from && t.getEstimate() <=  to)
                    .collect(Collectors.toList());
    }
}
