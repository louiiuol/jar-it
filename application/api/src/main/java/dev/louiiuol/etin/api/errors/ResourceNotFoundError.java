package dev.louiiuol.etin.api.errors;

import java.io.Serializable;

/** 
 * Represents an error when specific resource cannot be found.
 */
public final class ResourceNotFoundError implements Serializable {

    private static final long serialVersionUID = 1L;

    private String error = "{E_NOT_FOUND}";

    public ResourceNotFoundError() {/*Overrides default constructor as public without arguments*/}

    @Override
    public String toString() { return "{error=" + error + "}"; }

}