package dev.louiiuol.jarit.services.utils;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import dev.louiiuol.jarit.business.entities.JarState;
import dev.louiiuol.jarit.business.entities.Jar;
import dev.louiiuol.jarit.business.repositories.JarRepository;

/** Scheduler that perform task over API to
 * udpate regularly informations depending on checks returns
 * 
 * @see Scheduled
 */
@Service
public class SchedulerService extends AbstractService<Jar, JarRepository> {

    protected SchedulerService(JarRepository repository) { super(repository); }

    /**
     * Checks every day at midnight if Jar is outdated
     * Set State and save updated entity in database
     */
    @Scheduled(cron="0 0 0 * * *") // to be run every day at 00 am
    public void checkJarEndDate() {
        List<Jar> tinees = repo().findAll();
        for (Jar tinee : tinees)
            if (tinee.getClosingDate().isBefore(LocalDate.now())) {
                tinee.setState(JarState.OUT_DATED);
                repo().save(tinee);
            }
    }

}