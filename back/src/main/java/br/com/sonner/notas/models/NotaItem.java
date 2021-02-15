package br.com.sonner.notas.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "nota_item")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class NotaItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY Para Gerar Valor Id Automático
    private long id;

    @ManyToOne
    @JoinColumn(name="nota") // Relaciona com a Coluna Nota.
    @JsonIgnore
    private Nota nota; // nota da Classe Nota

    private long codigo;

    private String descricao;

    private long quantidade;

    private BigDecimal valorUnitario;


    public long getId() { // Busca o Id do Nota Item
        return id;
    }

    public void setId(long id) { // Insere ou Atualiza o Id do Nota Item
        this.id = id;
    }

    public long getCodigo() { // Busca o Código do Nota Item
        return codigo;
    }

    public void setCodigo(long codigo) { // Insere o Código
        this.codigo = codigo;
    }

    public long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(long quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(BigDecimal valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public Nota getNota() {
        return nota;
    }

    public void setNota(Nota nota) {
        this.nota = nota;
    }
}

