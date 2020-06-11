package dev.louiiuol.jarit.business.entities;

/**
 * Describes a {@code State} enumeration <i>jar's state: </i>
 * <ul>
 * <li> {@code CREATED} - The jar has been created and is ready for invitations and customisation
 * <li> {@code ACTIVE} - The jar has been activated by the admin and is ready for confessions only
 * <li> {@code OUT_DATED}* - The jar has reached the limit date defined on it's creation
 * <li> {@code MAX_AMOUNT_REACHED}* -  The jar has reached the maximum amount defined on it's creation
 * <li> {@code PAYED} - All members have payed for the Associatio
 * <li> {@code CLOSED} - The jar will be displayed in "CLOSED" category (UI Filter)
 * </ul>
 * * these states disable members add new members or swears:
 * the jar is now awaiting for payment</i>
 */
public enum JarState { CREATED, ACTIVE, OUT_DATED, MAX_AMOUNT_REACHED, PAYED, CLOSED }