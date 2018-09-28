package com.antkorwin.taskservice.service.task;

import com.antkorwin.commonutils.actions.ActionArgument;
import lombok.*;

/**
 * Created on 14.08.2018.
 *
 * @author Korovin Anatoliy
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTaskArgument implements ActionArgument {

    private String title;
    private int estimate;

    @Override
    public boolean validate() {
        return title != null
               && title.length() != 0
               && estimate >= 0;
    }
}
