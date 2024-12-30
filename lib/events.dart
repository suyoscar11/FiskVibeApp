// // ignore_for_file: prefer_const_constructors

// import 'package:flutter/material.dart';

// class Eventss extends StatefulWidget {
//   const Eventss({super.key});

//   @override
//   State<Eventss> createState() => _EventssState();
// }

// class _EventssState extends State<Eventss> {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false,
//       home: Scaffold(
//           appBar: AppBar(
//               title: Row(
//             children: [
//               MenuBar(children: [
//                 MenuItemButton(
//                   child: Row(
//                     children: [Icon(Icons.menu)],
//                   ),
//                   onPressed: () {},
//                 )
//               ]),
//               Text('Events')
//             ],
//           )),
//           body: Column(
//             children: const [
//               SearchBar(
//                 padding: MaterialStatePropertyAll<EdgeInsets>(
//                     EdgeInsets.symmetric(horizontal: 8.0)),
//                 leading: Icon(Icons.search),
//                 trailing: <Widget>[Icon(Icons.verified_user)],
//               )
//             ],
//           )),
//     );
//   }
// }

// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class Eventss extends StatefulWidget {
  const Eventss({super.key});

  @override
  State<Eventss> createState() => _EventssState();
}

class _EventssState extends State<Eventss> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Text('Events'),
          backgroundColor: Colors.white, // Background color to match your image
          actions: [
            IconButton(
              icon: Icon(Icons.search),
              onPressed: () {
                print("I got pressed");
              },
            ),
          ],
        ),
        body: Column(
          children: [
            SearchBar(
              padding: WidgetStatePropertyAll<EdgeInsets>(
                  EdgeInsets.symmetric(horizontal: 8.0)),
              leading: Icon(Icons.search),
              trailing: <Widget>[Icon(Icons.verified_user)],
            ),
            SizedBox(
              height: 20,
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  // Calendar navigation like the tabs at the top
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Text('Mon 2',
                            style: TextStyle(
                                color: Colors.purple[800],
                                fontWeight: FontWeight.bold)),
                        Text('Tue 3'),
                        Text('Wed 4'),
                        Text('Thu 5'),
                        Text('Fri 6'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 20,
            ),
            // Event List

            Expanded(
              child: ListView(
                children: [
                  eventItem('2024 Welcome Week Tabling', 'All day',
                      'Office of Sustainability'),
                  eventItem('Labor Day Holiday (No Classes)', 'All day', ''),
                  eventItem('AMC 27th Annual Art Show', 'All day',
                      'Kimmel Center for University Life'),
                  eventItem('Fall 2024', 'All day', 'NYU Shanghai New Bundle'),
                  eventItem('Last Day to Enroll for Tuition Refund Insurance',
                      'All day', ''),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Custom widget for displaying an event
  Widget eventItem(String title, String time, String location) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(time),
              Text(location, style: TextStyle(color: Colors.grey)),
            ],
          ),
          Divider(),
        ],
      ),
    );
  }
}

void main() {
  runApp(Eventss());
}
