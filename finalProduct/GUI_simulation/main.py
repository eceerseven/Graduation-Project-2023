import math
import random
from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def home_call():
    return render_template('homePage.html')


@app.route('/help', methods=['GET'])
def help_call():
    return render_template('helpPage.html')


@app.route('/contact', methods=['GET'])
def contact_call():
    return render_template('contact.html')


@app.route('/createSim', methods=['GET'])
def createSim_call():
    return render_template('selectionPage.html')


@app.route('/mm1l', methods=['GET', 'POST'])
def index():
    mue = 0
    lamda = 0
    entityC = 0
    QueueSize = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/1/L simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                mue = mu

        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                queueSize = splitArray[2]
                lamda = lam
                entityC = entityCount
                QueueSize = queueSize

        print("\nValues entered are:\nMue:"+str(mue)+"\nLambda:"+str(lamda)+"\nNumber of Entities:"+str(entityC)+"\nQueue size:"+str(QueueSize))
        return render_template('simulation_mm1l.html', mue=mue, lamda=lamda, entityC=entityC, QueueSize=QueueSize)
    else:
        return render_template('MM1LPage.html')


@app.route('/mm1', methods=['GET', 'POST'])
def get_inputs():
    Mu = 0
    Lam = 0
    entityC = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/1 simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                Mu = mu
        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                Lam = lam
                entityC = entityCount

        entityC = int(entityC)
        Lam = float(Lam)
        Mu = float(Mu)

        # Calculate the MQL values
        mql_values = calculate_mql(entityC, Lam, Mu)
        entities_list = []
        for i in range(entityC):
            entities_list.append(i)

        print("\nValues entered are:\nMue:" + str(Mu) + "\nLambda:" + str(Lam) + "\nNumber of Entities:" + str(entityC))

        return render_template('simulation_mm1.html', mql_values=mql_values, entities_list=entities_list)
    else:
        return render_template('MM1Page.html')


@app.route('/mmc', methods=['GET', 'POST'])
def mmc_func():
    starting_list = []
    mue_list = []
    lamda = 0
    entity = 0
    server = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/C simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                starting_list.append(mu)
                mue_list = starting_list

        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                entity = entityCount
                lamda = lam

        for key, serverCount in request.form.items():
            if key.startswith("count"):
                server = serverCount

        mue = min(mue_list)

        print("\nValues entered are:\nALl the Mue values entered:"+str(mue_list)+"\nSelected min Mue:"+str(mue)+"\nLambda:"+str(lamda)+"\nServer count:"+str(server))

        return render_template('simulation_mmc.html', mue=mue, lamda=lamda, server=server)
    else:
        return render_template('MMCPage.html')


@app.route('/mmcl', methods=['GET', 'POST'])
def mmcl_func():
    starting_list = []
    mue_list = []
    lamda = 0
    entity = 0
    limit = 0
    server = 0
    if request.method == 'POST':
        print("\nInside main.py file for M/M/C/L simulation: ")
        for key, mu in request.form.items():
            if key.startswith("server"):
                starting_list.append(mu)
                mue_list = starting_list

        for key, lambda_val in request.form.items():
            if key.startswith("queue"):
                splitArray = lambda_val.split(',')
                lam = splitArray[0]
                entityCount = splitArray[1]
                lim = splitArray[2]
                lamda = lam
                limit = lim

        for key, serverCount in request.form.items():
            if key.startswith("count"):
                server = serverCount

        mue = min(mue_list)

        print("\nValues entered are:\nALl the Mue values entered:"+str(mue_list)+"\nSelected min Mue:"+str(mue)+"\nLambda:"+str(lamda)+"\nServer count:"+str(server)+"\nLimit:"+str(limit))

        return render_template('simulation_mmcl.html', lamda=lamda, mue=mue, server=server, limit=limit)
    else:
        return render_template('MMCLPage.html')


def calculate_mql(Number_of_Entities, lamda, mue):
    time_Arrival = 0
    Iat = -1 / lamda * math.log(random.random())
    Start_Serving = 0
    entity_list = []
    finish_Time = Start_Serving + mue
    total_waiting_time = 0
    finish_list = []
    mql_list = []
    mql = 0
    for i in range(int(Number_of_Entities)):
        time_Arrival += Iat
        Iat = -(1 / lamda) * math.log(random.random())
        Start_Serving = max(time_Arrival, finish_Time)
        St = -(1 / mue) * math.log(random.random())
        finish_Time = Start_Serving + St
        entity_list.append(i)
        finish_list.append(finish_Time)
        waiting = finish_Time - time_Arrival
        mql += waiting
        mql_list.append(mql / finish_Time)
        total_waiting_time += waiting
    return mql_list


if __name__ == '__main__':
    app.run()
