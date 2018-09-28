package com.antkorwin.taskservice.service.crud;

import com.antkorwin.commonutils.actions.ActionArgument;
import com.antkorwin.taskservice.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;

/**
 * Created on 14.08.2018.
 *
 * @author Korovin Anatoliy
 */
public abstract class BaseCrudService<EntityT extends BaseEntity,
        CreateArgumentT extends ActionArgument,
        UpdateArgumentT extends ActionArgument>
        implements CrudService<EntityT, CreateArgumentT, UpdateArgumentT> {

    private final JpaRepository<EntityT, UUID> repository;

    protected BaseCrudService(JpaRepository<EntityT, UUID> repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public EntityT get(UUID id) {
        return getExisting(id);
    }

    @Override
    @Transactional
    public EntityT create(CreateArgumentT argument) {
        return repository.save(createEntityFromArgument(argument));
    }

    @Override
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public EntityT update(UUID id, UpdateArgumentT argument) {
        EntityT entity = getExisting(id);
        return repository.save(updateEntityByArgument(entity, argument));
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void delete(UUID id) {
        repository.delete(getExisting(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EntityT> getAll() {
        return repository.findAll();
    }

    protected abstract EntityT createEntityFromArgument(final CreateArgumentT argumentT);

    protected abstract EntityT updateEntityByArgument(final EntityT entityT, UpdateArgumentT argumentT);

    private EntityT getExisting(UUID id) {
        return repository.findById(id)
                         .orElseThrow(EntityNotFoundException::new);
    }
}
