package br.com.sonner.notas.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "nota_item")
public class NotaItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY Para Gerar Valor Id Automático
    private Long id;

    @ManyToOne
    @JoinColumn(name="nota") // Relaciona com a Coluna Nota.
    @JsonIgnore
    private Nota nota; // nota da Classe Nota

    private long codigo;

    private String descricao;

    private Long quantidade;

    private BigDecimal valorUnitario;


    public Long getId() { // Busca o Id do Nota Item
        return id;
    }

    public void setId(Long id) { // Insere ou Atualiza o Id do Nota Item
        this.id = id;
    }

    public Long getCodigo() { // Busca o Código do Nota Item
        return codigo;
    }

    public void setCodigo(Long codigo) { // Insere o Código
        this.codigo = codigo;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
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

