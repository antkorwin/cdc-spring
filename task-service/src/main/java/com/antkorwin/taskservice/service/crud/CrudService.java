package com.antkorwin.taskservice.service.crud;

import com.antkorwin.commonutils.actions.ActionArgument;
import com.antkorwin.taskservice.model.BaseEntity;

import java.util.List;
import java.util.UUID;

/**
 * Created on 14.08.2018.
 *
 * @author Korovin Anatoliy
 */
public interface CrudService<EntityT extends BaseEntity,
        CreateArgumentT extends ActionArgument,
        UpdateArgumentT extends ActionArgument> {

    EntityT get(UUID id);

    EntityT create(CreateArgumentT argument);

    EntityT update(UUID id, UpdateArgumentT argument);

    void delete(UUID id);

    List<EntityT> getAll();
}
