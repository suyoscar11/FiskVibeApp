import 'package:fisk_vibe_flutter/professor_page.dart';
import 'package:fisk_vibe_flutter/student_page.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Professor extends StatefulWidget {
  const Professor({super.key});

  @override
  State<Professor> createState() => _ProfessorState();
}

class _ProfessorState extends State<Professor> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          // title: Text("Schedule an Appointments"),
          ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment
                  .center, // mainaxisalignment centers all the row contents
              children: [
                Text(
                  "Fisk",
                  style: GoogleFonts.urbanist(
                      fontWeight: FontWeight.bold,
                      fontSize: 80,
                      color: Colors.yellow.withOpacity(1.0)),
                ),
                Text(
                  "Vibe",
                  style: GoogleFonts.urbanist(
                      fontWeight: FontWeight.bold,
                      fontSize: 80,
                      color: Colors.blueGrey),
                )
              ],
            ),
            SizedBox(
              height: 5,
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 8.0),
              child: Text(
                textAlign: TextAlign.center,
                'Appoint your Professor with one tap',
                style: GoogleFonts.urbanist(
                    fontWeight: FontWeight.w500, color: Colors.grey[600]),
              ),
            ),
            SizedBox(
              height: 60,
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 8.0),
              child: Text(
                textAlign: TextAlign.center,
                'Choose Your Role',
                style: GoogleFonts.urbanist(
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                    color: Colors.grey[600]),
              ),
            ),
            SizedBox(
              height: 30,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                InkWell(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ProfessorPage()));
                  },
                  child: Container(
                    width: 130,
                    height: 150,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          'assets/images/professorsvg.png',
                          width: 80,
                          height: 80,
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Professor',
                          style: GoogleFonts.urbanist(
                              fontSize: 17, color: Colors.grey[600]),
                        ),
                      ],
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white70,
                      border: Border.all(
                        color: Color(0xFF7165D6),
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => StudentPage()));
                  },
                  child: Container(
                    width: 130,
                    height: 150,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          'assets/images/studentsvg.png',
                          width: 80,
                          height: 80,
                        ),
                        SizedBox(height: 10),
                        Text(
                          'User',
                          style: GoogleFonts.urbanist(
                              fontSize: 17, color: Colors.grey[600]),
                        ),
                      ],
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white70,
                      border: Border.all(
                        color: Color(0xFF7165D6),
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
