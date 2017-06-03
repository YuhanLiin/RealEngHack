

import java.util.Timer;
import java.util.TimerTask;

public class timer {
    public static  Timer timer;


    public static void main(String args[]){
      timer = new Timer();
        int counter =10000;
        int timerperiod = 10;

        TimerTask task1 = new TimerTask(){
            int counter = 10;
            public void run(){
                if(counter>3) {
                    System.out.println(counter + "...");
                }
                else if (counter<=3 && counter>=0){
                    switch (counter) {
                        case(3):
                            System.out.println("Three");
                            break;
                        case(2):
                            System.out.println("Two");
                            break;
                        case(1):
                            System.out.println("One");
                            break;
                       }
                    }
                if (counter == -1){
                    System.out.println("**ROCKET LAUNCH**");
                    System.exit(0);
                }
                counter--;

            }
        };
      timer.schedule(task1,0, timerperiod);
    }
}
