package dev.louiiuol.jarit.business.dtos.jars;

public class JarPreviewExtrasDto {

    private Double balance;

    private int membersCount;

    private int confessionsCount;

    private boolean currentUserIsAdmin;

    protected JarPreviewExtrasDto() {
        // Overrides default no-args constructor as protected
    }

    public JarPreviewExtrasDto(Double balance, int membersCount, int confessionsCount,
        boolean currentUserIsAdmin) {
        this.balance = balance;
        this.membersCount = membersCount;
        this.confessionsCount = confessionsCount;
        this.currentUserIsAdmin = currentUserIsAdmin;
    }

    @Override
    public String toString() {
        return "JarPreviewExtrasDto [balance=" + balance + ", confessionsCount=" + confessionsCount
                + ", currentUserIsAdmin=" + currentUserIsAdmin + ", membersCount=" + membersCount + "]";
    }

}