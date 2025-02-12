export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nicholas_Ficara_Resume_{{ specifier }}</title>
    <style>
        @font-face {
            font-family: 'Calibri';
            src: url('{{ request.base_url }}/Calibri-Regular.ttf') format('truetype');
        }

        @font-face {
            font-family: 'Calibri-Bold';
            src: url('{{ request.base_url }}/Calibri-Bold.ttf') format('truetype');
        }

        html {
            height: 11.7in;
            width: 8.3in;
            margin: 0;
            font-family: "Calibri", sans-serif;
            font-variant-ligatures: none;
            {% if border %}border-bottom: 1px solid;{% endif %}
            {% if border %}margin-bottom: 10vh;{% endif %}
        }
        h1, h2, h3 {
            font-family: "Calibri-Bold", sans-serif;
        }
        b, strong {
            font-family: "Calibri-Bold", sans-serif;
            color: black;
        }
        body {
            margin: 1.2rem 2rem;
            color: #222222;
        }
        h1 {
            text-align: center;
            font-size: 18pt;
            margin: 8px 0;
        }
        h2 {
            font-size: 14pt;
            margin: 10px 0;
            margin-bottom: 0;
        }
        #links {
            margin: 0 auto;
            max-width: fit-content;
        }
        a {
            color: #222222;
        }
        hr {
            margin: 3px 0;
            margin-bottom: 0.5rem;
        }
        ul {
            margin: 8px 0;
            padding-left: 35px;
        }
        li {
            list-style-type: circle;
            margin-bottom: 5px;
            margin-top: 5px;
            line-height: 1.4;
        }
        li::marker {
            font-size: 1.4rem;
            line-height: 0;
        }
        #projects > ul {
            margin-top: 0;
            margin-bottom: 0;
        }
        #projects > ul > li > ul {
            margin-top: 0;
            margin-bottom: 0;
        }
    </style>
</head>
<body>
    <div id="Header">
        <h1>{{ data.name }}</h1>
        <div id="links">
            {% assign visible_links = data.links | where: "hidden", false %}
            {% for link in visible_links %}
                <span><a href="{{ link.link }}">{{ link.display }}</a></span>{% unless forloop.last %}&nbsp;-&nbsp;{% endunless %}
            {% endfor %}
        </div>
    </div>

    <div id="Skills">
        <h2>Skills</h2>
        <hr>
        <ul>
        {% for skill in data.skills %}
            <li>
                {{ skill.title }}:
                {% assign visible_skills = skill.list | where: "hidden", false %}
                {% for s in visible_skills %}{{ s.str }}{% unless forloop.last %}, {% endunless %}{% endfor %}
            </li>
        {% endfor %}
        </ul>
    </div>

    <div id="Experience">
        <h2>Experience</h2>
        <hr>
        {% for job in data.experience %}
            <strong>{{ job.position }}</strong>
            <span style="float: right;">{{ job.location }}</span>

            <div style="display: flex; justify-content: space-between; width: 100%">
                <span>{{ job.company }}</span>
                <span style="float: right;">{{ job.date }}</span>
            </div>

            <ul>
            {% for d in job.details %}{% unless d.hidden %}<li>{{ d.str }}</li>{% endunless %}{% endfor %}
            </ul>
        {% endfor %}
    </div>

    <div id="Projects">
        <h2>Software Projects</h2>
        <hr>
        <div id="projects">
        {% for project in data.projects %}{% unless project.hidden %}
            {{ project.title }}
            <ul>
            {% for p in project.details %}{% unless p.hidden %}<li>{{ p.str }}</li>{% endunless %}{% endfor %}
            </ul>
        {% endunless %}{% endfor %}
        </div>
    </div>

    <div id="Education">
        <h2>Education</h2>
        <hr>
        {% for ed in data.education %}
            <span>{{ ed.school }}</span>
            <span style="float: right;">{{ ed.location }}</span><br>
            <span>{{ ed.degree }}</span>
            <span style="float: right;">{{ ed.date }}</span><br>
            <ul>
            {% for d in ed.details %}{% unless d.hidden %}<li>{{ d.str }}</li>{% endunless %}{% endfor %}
            </ul>
        {% endfor %}
    </div>
</body>
</html>
`