package br.com.sonner.notas.repository;

import br.com.sonner.notas.models.Contribuinte;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.*;
import java.util.*;

// JPA Repository possui vários métodos prontas para fazer persistência no Banco de Dados.
public interface ContribuinteRepository extends JpaRepository<Contribuinte, Long> {
        Contribuinte findById(long Id);
}
